export const getRepositories = async (): Promise<any> => {
  const data = await fetch(
    "https://api.github.com/users/stylessh/repos?per_page=50"
  ).then((res) => res.json());

  return data;
};
