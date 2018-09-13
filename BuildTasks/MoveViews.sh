viewsDirectoryName="views";
distPath="../../dist";

setCurrentDirectoryToSource() {
	cd "$(dirname "$0")"
	cd ../src
	copyViews
}

copyViews() {
	for fileName in *; do 
		if [ -d "${fileName}" ] ; then
			handleDirectory "${fileName}"
		fi
	done
}

handleDirectory() {
	cd $1
	if [ -d "${viewsDirectoryName}" ] ; then
		echo "${distPath}/$1"
		cp -R "${viewsDirectoryName}" "${distPath}/$1"
	fi
	cd ..
}

setCurrentDirectoryToSource