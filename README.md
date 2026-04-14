# mathutils — CI/CD Learning Project

A simple JavaScript math utility library used to learn GitHub Actions CI/CD pipelines.

---

## What's in this project

```
.
├── src/
│   ├── arithmetic.js      add, subtract, multiply, divide
│   ├── statistics.js      mean, median, mode, range
│   ├── geometry.js        circleArea, rectangleArea, triangleArea, ...
│   └── index.js           re-exports everything
├── tests/                 Jest test files (one per source file)
├── build.js               copies src/ → dist/ (the "build" step)
├── .github/
│   └── workflows/
│       ├── ci.yml         CI pipeline: lint → test → build
│       └── cd.yml         CD pipeline: test → publish to GitHub Packages
├── package.json
├── jest.config.js         80% coverage required or the build fails
└── .eslintrc.json         lint rules
```

---

## CI/CD Pipeline Overview

### CI (`ci.yml`) — runs on every push and pull request

```
lint  ──►  test  ──►  build
```

| Job | What it does |
|-----|-------------|
| **lint** | Runs ESLint. Fails if you leave `console.log` in source or use `==` instead of `===`. |
| **test** | Runs Jest with coverage. Fails if coverage drops below 80%. Uploads the HTML coverage report as an artifact. |
| **build** | Runs `build.js` to copy `src/` into `dist/`. Uploads `dist/` as an artifact. |

### CD (`cd.yml`) — runs when you push a version tag

```
test  ──►  publish (requires environment approval)
```

Triggered by: `git tag v1.0.0 && git push --tags`

---

## Student Setup Guide

### Step 1 — Prerequisites (do this once on your Windows laptop)

1. Install [Node.js 20 LTS](https://nodejs.org/) — verify with:
   ```powershell
   node --version
   npm --version
   ```

2. Install [PowerShell Core](https://github.com/PowerShell/PowerShell/releases) (`pwsh`) — verify with:
   ```powershell
   pwsh --version
   ```

3. Enable Windows long paths (run PowerShell **as Administrator**):
   ```powershell
   New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" `
     -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
   ```
   Then restart your laptop.

4. (Recommended) Exclude your runner folder from Windows Defender to avoid slowdowns:
   - Open Windows Security > Virus & threat protection > Exclusions
   - Add folder: `C:\actions-runner`

---

### Step 2 — Fork and clone the repository

1. Fork this repository to your own GitHub account (or org).
2. Clone it:
   ```powershell
   git clone https://github.com/YOUR-USERNAME/mathutils.git
   cd mathutils
   ```

---

### Step 3 — Update the package name

Open `package.json` and replace `@karamkb2000` with your GitHub username or org name:

```json
"name": "@your-username/mathutils",
```

Do the same in `.npmrc` and in `cd.yml` (the `scope:` field under `setup-node`).

---

### Step 4 — Install and run locally

```powershell
npm install       # installs dependencies, creates package-lock.json
npm run lint      # should pass with no errors
npm test          # should pass with >80% coverage
npm run build     # should create a dist/ folder
```

---

### Step 5 — Register your laptop as a self-hosted runner

1. In your GitHub repo, go to **Settings > Actions > Runners > New self-hosted runner**.
2. Choose **Windows** and follow the PowerShell commands shown on screen.
3. During setup you will be asked for a runner name and labels — the defaults are fine.
4. Start the runner:
   ```powershell
   .\run.cmd
   ```
   Keep this window open. You should see `Listening for Jobs`.

> **Tip:** To run the runner automatically on startup, install it as a Windows Service:
> ```powershell
> .\svc.ps1 install
> .\svc.ps1 start
> ```

---

### Step 6 — Trigger the CI pipeline

Push any change to the repository:

```powershell
git add .
git commit -m "initial commit"
git push origin main
```

Go to the **Actions** tab in your GitHub repo and watch the pipeline run:

```
lint  ──►  test  ──►  build
```

After `test` completes, click on the run and download the **test-coverage** artifact to see the HTML coverage report.

---

### Step 7 — Create the npm-publish environment

1. In your GitHub repo go to **Settings > Environments > New environment**.
2. Name it exactly: `npm-publish`
3. (Optional) Add yourself as a **Required reviewer** — this means GitHub will wait for your approval before the publish job runs.

---

### Step 8 — Trigger the CD pipeline (publish a release)

```powershell
git tag v1.0.0
git push --tags
```

Go to the **Actions** tab and watch the CD pipeline. If you added a required reviewer, you will see a yellow banner asking you to approve the deployment before it publishes.

After it completes, go to your repo's **Packages** tab — you should see `@your-username/mathutils` listed there.

---

## Concepts you will see in action

| Concept | Where |
|---------|-------|
| Triggers (`on: push`, `on: pull_request`, `on: push tags`) | Both workflows |
| `runs-on: self-hosted` | Every job |
| `defaults: run: shell: pwsh` | Every job (Windows!) |
| `needs:` — job dependency graph | test needs lint, build needs test |
| `actions/checkout` | Every job |
| `actions/setup-node` | Every job |
| `npm ci` — reproducible installs | Every job |
| `actions/upload-artifact` | test job, build job |
| Coverage gates (80% threshold) | jest.config.js |
| `environment:` — protected deployments | publish job |
| `permissions: packages: write` | publish job |
| `secrets.GITHUB_TOKEN` — built-in token | publish job |

---

## Common issues

| Problem | Fix |
|---------|-----|
| Runner not picking up jobs | Make sure `run.cmd` is still running, or the service is started |
| `npm ci` fails with "missing package-lock.json" | Commit `package-lock.json` (`git add package-lock.json`) |
| `npm publish` fails with 403 | Check that the package `name` scope matches your GitHub org/username |
| `pwsh` not found | Install PowerShell Core and restart the runner |
| Tests fail due to coverage | Add more tests — the threshold is 80% lines/functions/branches |
| ESLint fails on `no-console` | Remove `console.log` calls from `src/` files |
