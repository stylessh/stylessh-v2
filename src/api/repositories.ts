export const getRepositories = async (): Promise<any> => {
  const data = await fetch(
    "https://api.github.com/users/stylessh/repos?per_page=50",
    {
      headers: {
        Authorization: `token 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`,
      },
    }
  ).then((res) => res.json());

  return data;
};
