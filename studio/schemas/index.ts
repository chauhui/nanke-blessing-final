// studio/schemas/index.ts

import event from './event';
import registration from './registration';
import memberReport from './memberReport';
import groupReport from './groupReport';
import group from './group';
import member from './member';
import userRegistration from './userRegistration';
import donation from './donation'; // <--- 加這一行

export const schemaTypes = [
  event,
  registration,
  memberReport,
  groupReport,
  group,
  member,
  userRegistration,
  donation,       // <--- 加這一行
];
