viewsDirectoryName="views";
distPath="../../dist";

log() {
	echo "BuildTasks: $1"
}

setCurrentDirectoryToSource() {
	log "-=- Copying Views -=-"
	cd "$(dirname "$0")"
	cd ../src
	copyViews
}

copyViews() {
	for fileName in *; do 
		if [ -d "${fileName}" ] ; then
			log "Found project directory ${fileName}..."
			handleDirectory "${fileName}"
		fi
	done
}

handleDirectory() {
	cd $1
	if [ -d "${viewsDirectoryName}" ] ; then
		log "Found Views in $1..."
		log "Copying views to dist..."
		cp -R "${viewsDirectoryName}" "${distPath}/$1"
		log "Finished moving views for $1 to dist"
	fi
	cd ..
}

setCurrentDirectoryToSource