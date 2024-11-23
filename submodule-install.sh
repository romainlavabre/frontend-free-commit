#!/bin/bash

SUBMODULES=(
    "git@github.com:fairfair-cloud/package-react-wrapper.git=src/package-react-wrapper=1.4.7"
)

for SUBMODULE in "${SUBMODULES[@]}" ; do
    IFS='=' read -ra TMP <<< "$SUBMODULE"

    URL="${TMP[0]}"
    DEST="${TMP[1]}"
    VERSION="${TMP[2]}"

    if [ -d "$DEST" ]; then
        rm -Rf "$DEST"
    fi

    CURRENT=$PWD

    git clone "$URL" "$DEST"
    cd "$DEST"
    git checkout $VERSION
    cd $CURRENT
    rm -Rf "$DEST"/.git
done