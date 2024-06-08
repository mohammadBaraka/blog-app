import { configureStore } from "@reduxjs/toolkit";
import { authentecation } from "./features/auth";
import { setupListeners } from "@reduxjs/toolkit/query";
import { users } from "./features/users";
import { categories } from "./features/category";
import { posts } from "./features/post";
import { likes } from "./features/like";
import { comments } from "./features/comments";

export const store = configureStore({
  reducer: {
    [authentecation.reducerPath]: authentecation.reducer,
    [users.reducerPath]: users.reducer,
    [categories.reducerPath]: categories.reducer,
    [posts.reducerPath]: posts.reducer,
    [likes.reducerPath]: likes.reducer,
    [comments.reducerPath]: comments.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authentecation.middleware,
      users.middleware,
      categories.middleware,
      posts.middleware,
      likes.middleware,
      comments.middleware
    ),
});
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
