import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { ProjectEnv, ProjectGit } from "./types.js";

function VersionControlLabel({ git }: { git: ProjectGit }) {
  if (git.hasGit) {
    const masterBranches = ['main', 'master'];

    if (git.branch && masterBranches.includes(git.branch)) {
      return <span className="bg-green-200 text-green-800 px-2 py-0.5 rounded-full text-sm font-bold">{git.branch}</span>
    }

    return <span className="bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full text-sm font-bold">{git.branch}</span>
  }

  return <span className="bg-red-200 text-red-800 px-2 py-0.5 rounded-full text-sm font-bold">No VCS</span>
}

function EnvLabels({ env }: { env: ProjectEnv }) {
  const { port, portInUse } = env;

  if (!port) {
    return <span className="text-nowrap bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-sm font-bold">No Port Detected</span>; 
  }

  if (portInUse) {
    return <span className="text-nowrap bg-green-200 text-green-800 px-2 py-0.5 rounded-full text-sm font-bold">Running {port}</span>; 
  }

  return <span className="text-nowrap bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-sm font-bold">(Not Running) Port {port}</span>;
}

function ExcludeButton() {
  return null;
  // return <span className="group-hover:visible group-hover:opacity-100 transition-all duration-200 opacity-0 bg-gray-600 text-white px-2 py-0.5 rounded-full text-sm font-bold">Exclude This</span>
}

export default function Page() {
  const projects = useData<Data>();
  return (
    <>
      <h1 className="text-3xl mb-4">Projects</h1>
      <ol className="grid grid-cols-3 gap-2">
        {projects.map(({ name, git, env }) => (
          <li className="group bg-gray-50 flex flex-col space-y-1 hover:bg-gray-200 border-gray-400 border p-2.5 rounded-sm" key={name}>
            <a href={`/projects/${name}`}>{name}</a>
            <div className="flex space-x-1">
              <VersionControlLabel git={git} />
              <ExcludeButton />
              <EnvLabels env={env} />
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
