const fs = require('fs');
const path = require('path');

const distPkgPath = path.join(__dirname, '..', 'dist', 'package.json');

if (!fs.existsSync(distPkgPath)) {
	console.error('dist/package.json not found');
	process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(distPkgPath, 'utf8'));

// 1. Remove dependencies as they are now bundled
delete pkg.dependencies;

// 2. Fix n8n paths to be relative to the dist folder (where this package.json lives)
if (pkg.n8n) {
	if (pkg.n8n.credentials) {
		pkg.n8n.credentials = pkg.n8n.credentials.map(p => p.replace(/^dist\//, ''));
	}
	if (pkg.n8n.nodes) {
		pkg.n8n.nodes = pkg.n8n.nodes.map(p => p.replace(/^dist\//, ''));
	}
}

// 3. Update scripts for the standalone version
pkg.scripts = {
	"test": "echo \"Error: no test specified\" && exit 1"
};

fs.writeFileSync(distPkgPath, JSON.stringify(pkg, null, 2));
console.log('Successfully updated dist/package.json for standalone deployment');
