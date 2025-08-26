#!/bin/bash
cd /home/kavia/workspace/code-generation/taskflow-collaboration-platform-163991/taskflow_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

