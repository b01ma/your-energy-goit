# Changing Default Branch for Pull Requests

This repository has been configured to use `staging` as the default branch for pull requests.

## What Has Been Done

1. **Pull Request Template** (`.github/pull_request_template.md`)
   - Added a template that clearly indicates PRs should target `staging`
   - Provides a structured format for all pull requests

2. **Configuration Files**
   - `.github/config.yml` - Configuration for GitHub Apps
   - `.github/settings.yml` - Configuration for Probot Settings app (if installed)

## Manual Steps Required

⚠️ **Important**: To fully change the default branch for pull requests, a repository administrator needs to update the setting in GitHub:

1. Go to the repository on GitHub: https://github.com/b01ma/your-energy-goit
2. Click on **Settings** (requires admin access)
3. In the left sidebar, click on **Branches**
4. Under "Default branch", click the switch/pencil icon
5. Select `staging` from the dropdown
6. Click **Update** and confirm the change

## What This Means

- All new pull requests will automatically target the `staging` branch instead of `main`
- This aligns with the team's workflow where:
  - `staging` is used for development and testing
  - `main` contains production-ready code
- Features are merged to `staging` first, then promoted to `main`

## Using the Configuration Files

If the repository has GitHub Apps installed (like Probot Settings), the `.github/settings.yml` file will automatically sync these settings. Otherwise, the manual steps above are required.

## Workflow

1. Create feature branch from `staging`
2. Make changes and commit
3. Create pull request → will default to `staging` base branch
4. After review and approval, merge to `staging`
5. Test in staging environment
6. When ready for production, create PR from `staging` to `main`
7. Merge to `main` → triggers deployment to production

## Verification

After changing the default branch in GitHub settings:
1. Go to the repository and click "Pull requests"
2. Click "New pull request"
3. The base branch should now show `staging` by default

---

**Last Updated**: 2025-11-19
