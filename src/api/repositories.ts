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
