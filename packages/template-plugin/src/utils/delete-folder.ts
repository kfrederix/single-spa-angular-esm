import { Tree, joinPathFragments } from "@nx/devkit";

export function deleteFolderOrFile(tree: Tree, folderPath: string): void {
  // If the path doesn't exist, exit
  if (!tree.exists(folderPath)) {
    return;
  }

  // If it's a file, just delete it
  if (tree.isFile(folderPath)) {
    tree.delete(folderPath);
    return;
  }

  // Otherwise, it's a directory: recursively remove its children
  const children = tree.children(folderPath);
  for (const child of children) {
    const childPath = joinPathFragments(folderPath, child);
    deleteFolderOrFile(tree, childPath);
  }

  // Finally, remove the directory itself
  tree.delete(folderPath);
}