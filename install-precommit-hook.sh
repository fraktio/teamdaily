#!/bin/bash

set -e

(cd client && yarn) && (cd server && yarn)

cat << EOF > .git/hooks/pre-commit
#!/bin/bash
set -e

(cd client && yarn run precommit) && (cd server && yarn run precommit)
EOF

chmod +x .git/hooks/pre-commit