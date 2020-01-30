---
id: git
title: Git
sidebar_label: Git
---

> Note: I don't want to re-do the documentation in [`git-scm.com`](https://git-scm.com/doc). My goal is to have valuable examples in this document and real experiences of the git commands that need to be handy.

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

### Inspection and Comparison

#### log

Show commit logs

```bash
# Your log in (guess what?) one line
git log --oneline
# See commits that is in develop branch but not in master
git log master..develop
# Use --no-merges to avoid noise of merge commits
git log master..develop --oneline --no-merges
# Some format
git log --pretty=format:"%h - %an, %ad (%ar) : %s"
# Some format + filtering by author
git log --pretty=format:"%H - %an, %ad (%ar) : %s" --author='Kina'
```

### Patching

#### cherry-pick

Apply the changes introduced by some existing commits

```bash
# Cherrypick a specific commit
git cherry-pick baa4e741b9109ac0bac14659e5a6421b55d13bc7
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
```

## Tools

- [Fork](https://git-fork.com/)
- [Source Tree](https://www.sourcetreeapp.com/)

## References

- [https://git-scm.com/docs](https://git-scm.com/docs)