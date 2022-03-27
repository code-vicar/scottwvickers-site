const path = require("path");
const globbyImport = import("globby");
const slugifyImport = import("@sindresorhus/slugify");

const PAGES_PATH = "pages";

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    basePath: Joi.string().description("Base path for apps"),
    apps: Joi.array().items(Joi.string()).required().description("App paths"),
  });
};

exports.createPages = async (
  { actions: { createPage } },
  { basePath, apps }
) => {
  const { globby } = await globbyImport;
  const { default: slugify } = await slugifyImport;

  for (const app of apps) {
    try {
      const appPagesPath = path.join(basePath, app, PAGES_PATH);
      const files = await globby(appPagesPath, {
        expandDirectories: {
          extensions: ["ts", "tsx", "js"],
        },
      });
      for (const file of files) {
        // get only the path segment relative to the pagesDir
        const relativePathFromPage = file.substring(appPagesPath.length);
        // parse the path to get just the dir + file name (no extension)
        const { dir, name } = path.parse(relativePathFromPage);
        // join the dir + name (no extension) and slugify it to get the gatsby page path
        const pagePath = slugify(path.join(dir, name));
        // resolve the absolute path to the component itself
        const componentPath = path.resolve(file);
        // console.log({
        //   appPagesPath,
        //   relativePathFromPage,
        //   pagePath,
        //   componentPath,
        // });
        createPage({
          path: pagePath,
          component: componentPath,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
};
