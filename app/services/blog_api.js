export const create_blog = async (accessToken, data) => {
  const res = await fetch("http://localhost:3000/api/blog", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
};

export const update_blog = async () => {
  return <div>blog_api</div>;
};

export const delete_blog = async () => {
  return <div>blog_api</div>;
};

export const get_blog = async () => {
  return <div>blog_api</div>;
};

export const getSingle_blog = async () => {
  return <div>blog_api</div>;
};
