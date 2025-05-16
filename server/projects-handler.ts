// TODO: stop using universal-middleware and directly integrate server middlewares instead and/or use vike-server https://vike.dev/server. (Bati generates boilerplates that use universal-middleware https://github.com/magne4000/universal-middleware to make Bati's internal logic easier. This is temporary and will be removed soon.)
import type { Get, UniversalHandler } from "@universal-middleware/core";
import { readdirSync, statSync, readFileSync } from "node:fs";
import type { Project, ProjectEnv, ProjectGit } from '../pages/projects/types';
import { parse as dotEnvParse } from 'dotenv';
import { detect } from 'detect-port';

// import 'dotenv/config';

function getDirectoriesInPath(path: string): string[] {
  return readdirSync(path).filter(function (file) {
    return statSync(`${path}/${file}`).isDirectory();
  });
}

function getProjectGitData(projectName: string): ProjectGit {
  const git: ProjectGit = {
    hasGit: false,
    branch: null,
  }

  try {
    const path = `${process.env.PROJECTS_DIRECTORY}/${projectName}/.git/HEAD`;
    const headFileContents = readFileSync(path, { encoding: 'utf8' });
    const trimmedHeadFileContents = headFileContents.trim().replace('ref: refs/heads/', '');

    git.branch = trimmedHeadFileContents;
    git.hasGit = true;
  } catch (e) {
    // console.log('error encountered attempting to read HEAD', e);
  }

  return git;
}

async function getProjectEnvData(projectName: string): Promise<ProjectEnv> {
  const env: ProjectEnv = {
    port: null,
    portInUse: false,
    environment: null,
  }

  try {
    const projectEnvFile = readFileSync(`${process.env.PROJECTS_DIRECTORY}/${projectName}/.env`, { encoding: 'utf8' });
    const parsed = dotEnvParse(projectEnvFile);

    env.environment = parsed.ENVIRONMENT || null;
    env.port = +parsed.PORT || null

    // only detect a port for a project if we know it
    if (env.port) {
      const detected = await detect(env.port)

      if (detected == env.port) {
        env.portInUse = true;
      }
    }
  } catch (e) {
    // console.log('error encountered attempting to read ENV', e);
  }

  return env;
}

export const projectsHandler: Get<[], UniversalHandler<Universal.Context & object>> =
  () => async (request, _context, _runtime) => {
    console.log('projects handler call');
    const projectDirectories = getDirectoriesInPath(process.env.PROJECTS_DIRECTORY as string);

    const projects: Project[] = await Promise.all(projectDirectories.map(async (name) => {
      const git = getProjectGitData(name);
      const env = await getProjectEnvData(name);

      return {
        name,
        env,
        git,
      }
    }));

    // console.log(projects);

    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  };
