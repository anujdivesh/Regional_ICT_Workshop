import"./style-CSnia0YI.js";import{s as f,a as p}from"./shared-eRITiLAf.js";const l=`=================================================================\r
 OCEAN PORTAL SERVER - system log\r
 Host: ocean-portal-01      Timezone: UTC+12\r
 Three days of routine checks, warnings and errors.\r
=================================================================\r
\r
--- Monday 27 July ---\r
06:00  OK       Nightly backup completed. 12.4 GB written to /backup.\r
06:01  OK       Disk space check: 71% used. Plenty of room.\r
07:15  OK       Staff logging in. 14 users online.\r
08:00  OK       Backup from 06:00 confirmed complete.\r
09:30  OK       Disk space check: 71% used.\r
10:42  OK       Tide gauge feed received. 6 stations reporting.\r
11:00  OK       Disk space check: 72% used.\r
13:20  WARNING  Log files in /var/log have grown to 9 GB. Not cleared since January.\r
14:00  OK       Disk space check: 72% used.\r
16:30  OK       Website response time 0.4 seconds. Normal.\r
17:45  OK       Duty officer handover. Nothing outstanding.\r
23:00  OK       Disk space check: 73% used.\r
\r
--- Tuesday 28 July ---\r
06:00  OK       Nightly backup completed. 12.6 GB written to /backup.\r
06:01  OK       Disk space check: 78% used.\r
07:10  OK       Staff logging in. 16 users online.\r
08:34  WARNING  Failed login attempt for user 'admin' from 203.0.113.44.\r
08:35  WARNING  Failed login attempt for user 'admin' from 203.0.113.44.\r
08:36  WARNING  Failed login attempt for user 'admin' from 203.0.113.44.\r
08:40  OK       Firewall blocked 203.0.113.44 after 3 failed attempts.\r
09:30  OK       Disk space check: 81% used.\r
10:15  ERROR    Network timeout contacting ocean-obs-api.spc.int. Retrying.\r
10:16  OK       Network recovered. Tide gauge feed received.\r
11:00  OK       Disk space check: 84% used.\r
12:45  WARNING  Disk space check: 86% used. Filling faster than usual.\r
13:30  WARNING  Log files in /var/log have grown to 19 GB. Not cleared since January.\r
14:10  WARNING  Disk space check: 91% used. Less than 6 GB free.\r
15:00  OK       Website response time 1.1 seconds. Slower than normal.\r
16:20  WARNING  Nightly backup estimate now 40 minutes, up from 12.\r
17:45  OK       Duty officer handover. Disk usage noted, no action taken.\r
23:00  WARNING  Disk space check: 94% used. Less than 3 GB free.\r
\r
--- Wednesday 29 July ---\r
02:00  ERROR    Nightly backup failed. Could not write to /backup: no space left on device.\r
02:01  WARNING  No usable backup exists for Tuesday 28 July.\r
06:01  WARNING  Disk space check: 96% used. Less than 2 GB free.\r
07:12  OK       Staff logging in. 15 users online.\r
09:30  WARNING  Disk space check: 98% used.\r
13:45  WARNING  Website slow. Pages taking 8 seconds to load.\r
14:35  WARNING  Two staff phoned to ask if the system is down.\r
14:50  WARNING  Disk space check: 99% used. Less than 300 MB free.\r
15:02  ERROR    Disk full. No space left on device.\r
15:02  ERROR    Website unavailable. Users see "service unavailable".\r
15:03  ERROR    Database could not write. Today's submissions are not saved.\r
15:03  ERROR    Tide gauge feed rejected. Incoming data discarded.\r
15:04  OK       Duty officer opened ticket INC-0412.\r
\r
`,h=`=================================================================\r
 OCEAN PORTAL SERVER - backup log\r
 Host: ocean-portal-01      Timezone: UTC+12\r
 Two weeks of the nightly backup, and the copy sent off-site.\r
=================================================================\r
\r
Thu 17 Apr  02:25 OK       Backup finished. 41 GB saved to the backup drive.\r
Thu 17 Apr  02:30 OK       Copy sent to the off-site office. Received.\r
Fri 18 Apr  02:24 OK       Backup finished. 41 GB saved to the backup drive.\r
Fri 18 Apr  02:30 OK       Copy sent to the off-site office. Received.\r
Mon 21 Apr  02:26 OK       Backup finished. 42 GB saved to the backup drive.\r
Mon 21 Apr  02:30 OK       Copy sent to the off-site office. Received.\r
Tue 22 Apr  02:24 OK       Backup finished. 42 GB saved to the backup drive.\r
Tue 22 Apr  02:31 OK       Copy sent to the off-site office. Received.\r
Wed 23 Apr  02:25 OK       Backup finished. Saved to the backup drive.\r
Wed 23 Apr  02:31 WARNING  Could not reach the off-site office. Will retry.\r
Thu 24 Apr  02:25 OK       Backup finished. Saved to the backup drive.\r
Thu 24 Apr  02:31 WARNING  Could not reach the off-site office. 2 days.\r
Fri 25 Apr  02:25 OK       Backup finished. Saved to the backup drive.\r
Fri 25 Apr  02:31 WARNING  Could not reach the off-site office. 3 days.\r
Mon 28 Apr  02:26 OK       Backup finished. Saved to the backup drive.\r
Mon 28 Apr  02:31 WARNING  Could not reach the off-site office. 6 days.\r
Tue 29 Apr  02:25 OK       Backup finished. Saved to the backup drive.\r
Tue 29 Apr  02:31 WARNING  Could not reach the off-site office. 7 days.\r
Wed 30 Apr  02:25 WARNING  Backup finished, but with read errors on the backup drive.\r
Wed 30 Apr  02:31 WARNING  Could not reach the off-site office. 8 days.\r
Wed 30 Apr  09:15 ERROR    Backup drive has failed. Copies on it cannot be read.\r
Wed 30 Apr  09:20 ERROR    Backup drive has failed. Copies on it cannot be read.\r
\r
`;f();p();const k=["OK","WARNING","ERROR"];function u(s,a){const r=document.getElementById(a);r.textContent="",s.split(`
`).forEach(t=>{const e=document.createElement("div"),n=k.find(o=>t.includes(" "+o+" "));if(n){const o=t.indexOf(n),c=document.createElement("span");c.textContent=t.slice(0,o);const i=document.createElement("span");i.className="level-"+n.toLowerCase(),i.textContent=n;const d=document.createElement("span");d.textContent=t.slice(o+n.length),e.append(c,i,d)}else e.className="log-aside",e.textContent=t;r.append(e)})}u(l,"log-view");u(h,"backup-log-view");function N(s){const a=s.dataset.sheet,r=s.querySelectorAll("tbody td"),t=localStorage.getItem(a);t&&JSON.parse(t).forEach((e,n)=>{r[n]&&e&&(r[n].textContent=e)}),r.forEach(e=>{e.contentEditable="true",e.addEventListener("input",()=>{const n=[...r].map(o=>o.textContent);localStorage.setItem(a,JSON.stringify(n))})})}document.querySelectorAll(".worksheet").forEach(N);
