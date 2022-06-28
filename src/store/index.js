
const page = (store) => {
  store.on("@init", () => ({ page: undefined }));
  store.on("page/set", ({ currentUser }, { page }) => {
    const newUser = page.data.page.global?.current_user;
    return {
      page,
      currentUser: currentUser ? currentUser : {
        ...newUser,
        status: newUser !== null
      },
    };
  });

  store.on("page/set/status", ({ page }, { status }) => {
    return {
      page: {
        ...page,
        status,
      },
    };
  });
};



export const store = [
  page,
];
