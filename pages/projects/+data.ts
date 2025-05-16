// https://vike.dev/data

import type { Project } from "./types.js";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
  // https://vike.dev/useConfig
  const config = useConfig();

  try {
    const response = await fetch("http://localhost:3000/api/projects", { cache: "no-store" });
    const projects = (await response.json()) as Project[];

    config({
      // Sets the page <title>
      title: `${projects.length} Found Projects`,
    });

    return projects;
  } catch (e) {
    return [];
  }
};
