import"./style-DpIVo_gF.js";import{s as u,a as f}from"./shared-eRITiLAf.js";const p=`=================================================================
 OCEAN PORTAL SERVER - system log
 Host: ocean-portal-01      Timezone: UTC+12
 Three days of routine checks, warnings and errors.
=================================================================

--- Monday 27 July ---
06:00  OK       Nightly backup completed. 12.4 GB written to /backup.
06:01  OK       Disk space check: 71% used. Plenty of room.
07:15  OK       Staff logging in. 14 users online.
08:00  OK       Backup from 06:00 confirmed complete.
09:30  OK       Disk space check: 71% used.
10:42  OK       Tide gauge feed received. 6 stations reporting.
11:00  OK       Disk space check: 72% used.
13:20  WARNING  Log files in /var/log have grown to 9 GB. Not cleared since January.
14:00  OK       Disk space check: 72% used.
16:30  OK       Website response time 0.4 seconds. Normal.
17:45  OK       Duty officer handover. Nothing outstanding.
23:00  OK       Disk space check: 73% used.

--- Tuesday 28 July ---
06:00  OK       Nightly backup completed. 12.6 GB written to /backup.
06:01  OK       Disk space check: 78% used.
07:10  OK       Staff logging in. 16 users online.
08:34  WARNING  Failed login attempt for user 'admin' from 203.0.113.44.
08:35  WARNING  Failed login attempt for user 'admin' from 203.0.113.44.
08:36  WARNING  Failed login attempt for user 'admin' from 203.0.113.44.
08:40  OK       Firewall blocked 203.0.113.44 after 3 failed attempts.
09:30  OK       Disk space check: 81% used.
10:15  ERROR    Network timeout contacting ocean-obs-api.spc.int. Retrying.
10:16  OK       Network recovered. Tide gauge feed received.
11:00  OK       Disk space check: 84% used.
12:45  WARNING  Disk space check: 86% used. Filling faster than usual.
13:30  WARNING  Log files in /var/log have grown to 19 GB. Not cleared since January.
14:10  WARNING  Disk space check: 91% used. Less than 6 GB free.
15:00  OK       Website response time 1.1 seconds. Slower than normal.
16:20  WARNING  Nightly backup estimate now 40 minutes, up from 12.
17:45  OK       Duty officer handover. Disk usage noted, no action taken.
23:00  WARNING  Disk space check: 94% used. Less than 3 GB free.

--- Wednesday 29 July ---
02:00  ERROR    Nightly backup failed. Could not write to /backup: no space left on device.
02:01  WARNING  No usable backup exists for Tuesday 28 July.
06:01  WARNING  Disk space check: 96% used. Less than 2 GB free.
07:12  OK       Staff logging in. 15 users online.
09:30  WARNING  Disk space check: 98% used.
13:45  WARNING  Website slow. Pages taking 8 seconds to load.
14:35  WARNING  Two staff phoned to ask if the system is down.
14:50  WARNING  Disk space check: 99% used. Less than 300 MB free.
15:02  ERROR    Disk full. No space left on device.
15:02  ERROR    Website unavailable. Users see "service unavailable".
15:03  ERROR    Database could not write. Today's submissions are not saved.
15:03  ERROR    Tide gauge feed rejected. Incoming data discarded.
15:04  OK       Duty officer opened ticket INC-0412.

`,h=`=================================================================
 OCEAN PORTAL SERVER - backup log
 Host: ocean-portal-01      Timezone: UTC+12
 Two weeks of the nightly backup, and the copy sent off-site.
=================================================================

Thu 17 Apr  02:25 OK       Backup finished. 41 GB saved to the backup drive.
Thu 17 Apr  02:30 OK       Copy sent to the off-site office. Received.
Fri 18 Apr  02:24 OK       Backup finished. 41 GB saved to the backup drive.
Fri 18 Apr  02:30 OK       Copy sent to the off-site office. Received.
Mon 21 Apr  02:26 OK       Backup finished. 42 GB saved to the backup drive.
Mon 21 Apr  02:30 OK       Copy sent to the off-site office. Received.
Tue 22 Apr  02:24 OK       Backup finished. 42 GB saved to the backup drive.
Tue 22 Apr  02:31 OK       Copy sent to the off-site office. Received.
Wed 23 Apr  02:25 OK       Backup finished. Saved to the backup drive.
Wed 23 Apr  02:31 WARNING  Could not reach the off-site office. Will retry.
Thu 24 Apr  02:25 OK       Backup finished. Saved to the backup drive.
Thu 24 Apr  02:31 WARNING  Could not reach the off-site office. 2 days.
Fri 25 Apr  02:25 OK       Backup finished. Saved to the backup drive.
Fri 25 Apr  02:31 WARNING  Could not reach the off-site office. 3 days.
Mon 28 Apr  02:26 OK       Backup finished. Saved to the backup drive.
Mon 28 Apr  02:31 WARNING  Could not reach the off-site office. 6 days.
Tue 29 Apr  02:25 OK       Backup finished. Saved to the backup drive.
Tue 29 Apr  02:31 WARNING  Could not reach the off-site office. 7 days.
Wed 30 Apr  02:25 WARNING  Backup finished, but with read errors on the backup drive.
Wed 30 Apr  02:31 WARNING  Could not reach the off-site office. 8 days.
Wed 30 Apr  09:15 ERROR    Backup drive has failed. Copies on it cannot be read.
Wed 30 Apr  09:20 ERROR    Backup drive has failed. Copies on it cannot be read.

`,N=`=================================================================
 OCEAN PORTAL WEBSITE - web server and certbot log
 Host: ocean-portal-web-02      Certificate: Let's Encrypt, 90 days
 Five weeks of the public website and its automatic renewal.
=================================================================

--- Week of Monday 4 May ---
Mon 04 May  02:00 OK       certbot renewal check: certificate valid for 33 more days. Nothing to do.
Mon 04 May  09:40 OK       IT closed unused ports on the web server. Port 443 left open.
Wed 06 May  03:00 OK       Website reachable. Response time 0.4 seconds.
Fri 08 May  02:00 WARNING  certbot renewal failed: the challenge could not be reached on port 80.
Fri 08 May  02:01 OK       Failure email sent to webmaster@ocean-portal.

--- Week of Monday 11 May ---
Mon 11 May  02:00 WARNING  certbot renewal failed. 26 days left. Same challenge error.
Tue 12 May  10:20 OK       Content team published 4 new bulletin pages.
Thu 14 May  02:00 WARNING  certbot renewal failed. 23 days left.
Fri 15 May  16:40 OK       Webmaster began two weeks of leave. No cover named.

--- Week of Monday 18 May ---
Mon 18 May  02:00 WARNING  certbot renewal failed. 19 days left. 9 attempts have now failed.
Tue 19 May  02:00 ERROR    Site plugin update failed. Rolled back automatically.
Tue 19 May  02:05 OK       Site plugin back at its previous version. Website reachable.
Thu 21 May  02:00 WARNING  certbot renewal failed. 16 days left.
Fri 22 May  09:00 WARNING  Let's Encrypt emailed: certificate expires in 15 days. Mailbox has 340 unread items.

--- Week of Monday 25 May ---
Mon 25 May  02:00 WARNING  certbot renewal failed. 12 days left.
Wed 27 May  02:00 WARNING  certbot renewal failed. 10 days left.
Fri 29 May  02:00 WARNING  certbot renewal failed. 8 days left.
Fri 29 May  17:45 OK       Duty officer handover. Nothing outstanding.

--- Week of Monday 1 June ---
Mon 01 June 02:00 WARNING  certbot renewal failed. 4 days left.
Tue 02 June 02:00 WARNING  certbot renewal failed. 3 days left.
Wed 03 June 02:00 WARNING  certbot renewal failed. 2 days left.
Thu 04 June 02:00 WARNING  certbot renewal failed. The certificate expires tomorrow.
Thu 04 June 17:45 OK       Duty officer handover. Nothing outstanding.
Fri 05 June 00:01 ERROR    Certificate expired. 26 renewal attempts have failed since 8 May.
Fri 05 June 07:20 ERROR    Visitors see "Your connection is not private".
Fri 05 June 07:35 WARNING  Three staff phoned to ask if the website has been hacked.
Fri 05 June 08:10 ERROR    Mobile app cannot sync. It refuses the expired certificate.
Fri 05 June 08:12 ERROR    Tide gauge stations cannot upload. Readings held on the device.
Fri 05 June 09:05 WARNING  Station SAM-02 storage full. Oldest readings overwritten.
Fri 05 June 09:40 OK       Duty officer opened ticket INC-0517.
Fri 05 June 10:15 WARNING  certbot run by hand. Same failure: port 80 unreachable from outside.
`,R=`=================================================================
 CLIDE DATABASE - PostgreSQL and application log
 Host: clide-db-01      Database: clide (PostgreSQL 16)
 One server holds two databases. A restore, and the morning after it.
=================================================================

--- Friday 12 June ---
02:00  OK       Nightly backup written: /backup/clide_2026-06-12.dump (61 GB).
02:10  OK       Nightly backup written: /backup/staff_directory_2026-06-12.dump (2 GB).
09:00  WARNING  A restore has never been tested. Noted in the plan, no date set.

--- Wednesday 17 June ---
02:00  OK       Nightly backup written: /backup/clide_2026-06-17.dump (61 GB).
02:10  OK       Nightly backup written: /backup/staff_directory_2026-06-17.dump (2 GB).
10:02  ERROR    Staff deleted 3,400 rows from obs_daily by mistake.
10:15  OK       Decision taken: restore last night's backup to get the rows back.
10:20  WARNING  Four dump files in /backup. Two applications, similar names.
10:24  OK       Restore started: pg_restore -d clide /backup/staff_directory_2026-06-17.dump
10:31  OK       Restore finished in 5 minutes. A 61 GB restore takes about 90.
10:32  OK       PostgreSQL accepting connections on port 5432.
10:34  ERROR    CliDE will not start. It stopped on its first query.
10:34  ERROR    Table "obs_daily" does not exist.
10:35  ERROR    Table "obs_aws" does not exist.
10:36  WARNING  The clide database now holds the staff directory's tables.
10:38  ERROR    CliDE unavailable to all climate staff. No data entry possible.
10:41  WARNING  The restore replaced CliDE's data. The deleted rows are still missing.
10:44  OK       The right file is on disk, untouched: /backup/clide_2026-06-17.dump
10:48  WARNING  Restoring 61 GB takes about 90 minutes. CliDE stays down until then.
10:55  WARNING  Nothing entered since 02:00 is in any backup. About 8 hours of work.
11:10  OK       Duty officer opened ticket INC-0702.
`;u();f();const b=["OK","WARNING","ERROR"];function r(s,i){const a=document.getElementById(i);a.textContent="",s.split(`
`).forEach(n=>{const e=document.createElement("div"),t=b.find(o=>n.includes(" "+o+" "));if(t){const o=n.indexOf(t),d=document.createElement("span");d.textContent=n.slice(0,o);const c=document.createElement("span");c.className="level-"+t.toLowerCase(),c.textContent=t;const l=document.createElement("span");l.textContent=n.slice(o+t.length),e.append(d,c,l)}else e.className="log-aside",e.textContent=n;a.append(e)})}r(p,"log-view");r(h,"backup-log-view");r(N,"website-log-view");r(R,"database-log-view");function k(s){const i=s.dataset.sheet,a=s.querySelectorAll("tbody td"),n=localStorage.getItem(i);n&&JSON.parse(n).forEach((e,t)=>{a[t]&&e&&(a[t].textContent=e)}),a.forEach(e=>{e.contentEditable="true",e.addEventListener("input",()=>{const t=[...a].map(o=>o.textContent);localStorage.setItem(i,JSON.stringify(t))})})}document.querySelectorAll(".worksheet").forEach(k);
