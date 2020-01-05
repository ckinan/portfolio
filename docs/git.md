---
id: git
title: Git
sidebar_label: Git
---

One of the most used version control system in the world. Most of this doc page is using structure and explanation from [`git-scm.com`](https://git-scm.com/doc).

## Commands

This is a list of commands I frequently use.

### Basic Snapshotting

#### commit

Record changes to the repository

```bash
# Syntax
git commit -m "<msg>"
# Example #1: Save your change
git commit -m "Add new validation"
# Example #2: Bypasses the pre-commit and commit-msg hooks
git commit -m 'Add new validation' --no-verify
```

### Branching and Merging

#### checkout

Switch between branches

```bash
# Syntax
git checkout -b <new_branch>
# Example #1: Switch to an existing branch
git checkout develop
# Example #2: Create new branch and switch
git checkout -b my_feature
```

### Still Pending...

```bash
# Basic Snapshotting
git status
git diff origin/master

# Branching and Merging
git branch
git merge master
git merge develop --squash

# Sharing and Updating Projects
git fetch
git pull
git push origin my-feature

# Inspection and Comparison
git log --oneline
git log master..develop
git log --pretty=format:"%h - %an, %ad (%ar) : %s"
git log --pretty=format:"%H - %an, %ad (%ar) : %s" --author='Kina'
```

## Tools

- [Fork](https://git-fork.com/)
- [Source Tree](https://www.sourcetreeapp.com/)

## References

- [https://git-scm.com/docs](https://git-scm.com/docs)