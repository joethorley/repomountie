//
// Copyright © 2020 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Created by Jason Leach on 2020-01-27.
//

import fs from 'fs';
import mongoose from 'mongoose';
import util from 'util';
import config from '../config';
import { ComplianceAudit } from '../models/compliance';

/**
 * Check if a string is valid JSON
 * This function will check if a string can be parsed into JSON
 * or not.
 * @param {string} aString The string to be evaluated
 * @returns A boolean of true if the string can be parsed, false otherwise.
 */
export const isJSON = (aString: string): boolean => {
    try {
        JSON.parse(aString);
        return true;
    } catch (err) {
        return false;
    }
};
/**
 * Extract and return and API response message
 * The errors received from using the github API via Probot
 * will return an Error message with a JSON encoded string in the
 * message property.
 * @param {Error} error The error from which to extract the message
 * @returns Undefined if unparsable, a resolved promise containing the results otherwise
 */
export const extractMessage = async (error: Error): Promise<string> => {
    try {
        if (isJSON(error.message)) {
            const data = JSON.parse(error.message);
            return data.message;
        }

        return error.message;
    } catch (err) {
        const message = 'Unable to extract message from error';
        return message;
    }
};

/**
 * Load a template file file and return the contents.
 *
 * @param {string} path The path to the template file
 * @returns {Promise<string>} Resolved with contents, rejected otherwise
 */
export const loadTemplate = async (path: string): Promise<string> => {
    const access = util.promisify(fs.access);
    const read = util.promisify(fs.readFile);
    try {
        await access(path, fs.constants.R_OK);
        return read(path, 'utf8');
    } catch (err) {
        const message = `Unable to load template ${path}`;
        throw new Error(`${message}, error = ${err.message}`);
    }
};

/**
 * Open a database connection.
 *
 * @returns {Promise<any>} Resolved a database connection.
 */
export const dbConnect = async () => {

    try {
        const options = {};
        const user = config.get('db:user');
        const passwd = config.get('db:password');
        const host = config.get('db:host');
        const dbname = config.get('db:database');
        const curl = `mongodb://${user}:${passwd}@${host}/${dbname}`;

        return await mongoose.connect(curl, options);
    } catch (err) {
        const message = `Unable to open database connection`;
        throw new Error(`${message}, error = ${err.message}`);
    }
};

/**
 * Close a database connection.
 *
 * @param {any} connection The database connection to close.
 */
export const dbCleanup = async (connection: any) => {

    connection.close();
};

/**
 * Load a template file file and return the contents.
 *
 * @param {string} path The path to the template file
 * @returns {Promise<string>} Resolved with contents, rejected otherwise
 */
export const extractComplianceStatus = (repoName: string, orgName: string, data: any) => {

    const records = data.spec.map((s: any) => {
        return {
            name: s.name,
            status: s.status,
            updatedAt: s['last-updated'],
        };
    });

    const ca = new ComplianceAudit({
        orgName,
        records,
        repoName,
        updateAt: new Date(),
    });

    return ca;
};

/**
 * Save a record to persistent storage.
 *
 * @param {object} model The model to be saved
 */
export const addComplianceStatusToPersistentStorage = async (model: any) => {

    try {
        const db = await dbConnect();
        await model.save();
        dbCleanup(db);
    } catch (err) {
        const message = `Unable save record to persistent storage`;
        throw new Error(`${message}, error = ${err.message}`);
    }
};
