# Welcome to Alpha-UI User Guide

The recommended workflow is to run in one terminal:
## 
```bash
npm run storybook
```

## Setting your git name and email
The following branches will be divided:

```bash
 git config --global user.email xxx@xxx.com 
 git config --global user.name xxx
```

## GIT's commit specification.

If it is a bug fix, then use BUGFIX: XXX
If it is a feature, then use FEAT: XXX
```bash
git add .
git commit -m 'FEAT:Initialize project';
```

## Management of Branch
- Version branch (version/): Branch of the upstream version
- Feature branch (feature/): Branch for developers
- Bugfix branch (bugfix): branch for fixing bugs
- Environment branch: master / test / dev 

master protects the branch

Version branch v1.0.0

will be updated to this branch after the current development is finished

Feature branch feature/[your name] + [feature name]
