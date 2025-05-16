# Local Dev Helper

Working on a microservice architecture with multiple branches & ports on your local?

This project is intended to help with that process.

## Project roadmap list

[x] Scan all project directories and report back their data in a web UI
  [x] For any projects using GIT, report back the branch
  [x] For any projects with PORTS, check if they are RUNNING
[] Config JSON file to exclude projects
[] Config JSON file to scan specific projects
[] Link projects together with ENV dependencies using a local JSON config, "Why did project x not run?", "OH! We need project y running first!"
[] Remove other scaffold work from Vike
  [] Remove star-wars
  [] Remove todo
  [] Alter logo and nav, clean up

## Get started

Copy the `.env.development` file into a fresh `.env` file and fill in the right directory for where your projects are located.

```PROJECTS_DIRECTORY``` IS REQUIRED.

```npm install```

```npm run preview```

Done!

(OSS credits)
This project powered by [Vike](https://vike.dev) and [React](https://react.dev/learn).
