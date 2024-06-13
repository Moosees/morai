import { readdirSync } from 'fs';

export const getAllFilesInFolder = (folderName) => {
	const foundFiles = [];

	const srcPath = import.meta.url;
	const folderPath = '../' + folderName;
	const subFolders = readdirSync(new URL(folderPath, srcPath));

	for (const folder of subFolders) {
		const subFolderPath = folderPath + '/' + folder;
		const files = readdirSync(new URL(subFolderPath, srcPath))
			.filter(file => file.endsWith('.js'));

		for (const file of files) {
			const filePath = subFolderPath + '/' + file;
			foundFiles.push(new URL(filePath, srcPath).href);
		}
	};

	return foundFiles;
};
