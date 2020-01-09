//
// Repo Mountie
//
// Copyright © 2018 Province of British Columbia
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
// Created by Jason Leach on 2018-10-01.
//

export const SCHEDULER_DELAY: number = 24 * 60 * 60 * 1000; // one day

export const COMMENT_TRIGGER_WORD = 'help';

export const GITHUB_ID = 'repo-mountie';

export const REPO_CONFIG_FILE = 'rmconfig.json';

export const REPO_COMPLIANCE_FILE = 'compliance.yaml';

export const HELP_DESK = {
  SUPPORT_USERS: ['jleach'],
};

export const COMMIT_FILE_NAMES = {
  COMPLIANCE: 'COMPLIANCE.yaml',
  LICENSE: 'LICENSE',
};

export const COMMIT_MESSAGES = {
  ADD_COMPLIANCE: 'Add compliance audit file',
  ADD_LICENSE: 'Add Apache License 2.0',
  UPDATE_COMPLIANCE: 'Updating compliance audit file',
};

export const PR_TITLES = {
  ADD_COMPLIANCE: 'Add missing compliance audit file',
  ADD_LICENSE: 'Add missing license',
};

export const BRANCHES = {
  ADD_COMPLIANCE: 'repo-mountie/add-compliance',
  ADD_LICENSE: 'repo-mountie/add-license',
};

export const TEMPLATES = {
  COMPLIANCE: 'templates/COMPLIANCE.yaml',
  CONDUCT: 'templates/CODE_OF_CONDUCT.md',
  CONTRIBUTE: 'templates/CONTRIBUTING.md',
  LICENSE: 'templates/LICENSE',
  README: 'templates/README.md',
};

export const VALID_LICENSES = {
  APACHE: 'apache-2.0',
};

export const TEXT_FILES = {
  HOWTO_PR: 'templates/howto_pull_request.md',
  WHY_LICENSE: 'templates/why-license.md',
  STALE_COMMENT: 'templates/stale_issue_comment.md',
  WHY_COMPLY: 'templates/why-comply.md',
};

export const COMMANDS = {
  IGNORE: '/bot-ignore-length',
};

export const REGEXP = {
  command: '@repo-mountie\\s+',
  compliance: '@repo-mountie\\s+update-(pia|stra)\\s+(in-progress|completed|TBD|exempt)',
  help: '@repo-mountie\\s+help',
};

export const ACCESS_CONTROL = {
  allowedInstallations: ['bcgov', 'fullboar'],
  allowedSsoClients: ['reggie-api'],
  complianceBetaGroup: [
    'devhub-signing-api',
    'devhub-signing-web',
    'secure-image-ios',
    'secure-image-android',
    'secure-image-api',
    'devhub-app-web',
    'Family-Protection-Order',
    'cas-ciip-portal',
    'hello6',
  ],
};
