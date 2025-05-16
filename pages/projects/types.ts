
export type ProjectGit = {
    hasGit: boolean;
    branch: string | null;
}

export type ProjectEnv = {
    port: number | null;
    portInUse: boolean;
    environment: string | null;
}

export type Project = {
    name: string;
    git: ProjectGit
    env: ProjectEnv;
};
