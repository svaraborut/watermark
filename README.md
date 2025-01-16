# 🎟️ Watermark GitHub Action

Create professional CI/CD watermarks for your projects effortlessly. This action provide seamless generation of
watermarking variables for GitHub CI/CD pipelines.

Ever stumbled on a bug in a deployed projects and wasted time trying to figure out which build version is running under
the hood? This is because you are missing a professional watermarking in your project.

## Example Usage

```yaml
      - name: Watermark
        id: watermark
        uses: svaraborut/watermark@v1
        with:
          format: 'vVERSION - BRANCH.SHA7 - DATE - svara.io'
          auto-version: npm

      - name: Build
        ...
        env:
          WATERMARK: ${{ steps.watermark.outputs.watermark }}
          NEXT_PUBLIC_URL: 'https://svara.io'
```

Simply add the stage to your build pipeline and configure the preferred watermark format using the [syntax](#syntax)

## Example Formats

| Format                 | Result                    |
|------------------------|---------------------------|
| `vVERSION`             | `v1.5.127`                |
| `vMAJOR.MINOR`         | `v1.5`                    |
| `vVERSION (build RUN)` | `v1.5.127 (build 17)`     |
| `vVERSION (DATE)`      | `v1.5.127 (2025-01-15)`   |
| `BRANCH.SHA7`          | `main.2e6dcdd`            |
| `BRANCH.SHA7 DATE`     | `main.2e6dcdd 2025-01-15` |
| `BRANCH.SHA7.RUN`      | `main.2e6dcdd.17`         |

## Inputs

| Input          | Description                                                                | Default         |
|----------------|----------------------------------------------------------------------------|-----------------|
| `format`       | Format of the watermark                                                    | `REF.SHA7 DATE` |
| `auto-version` | Define the flavour of the project, [see auto versioning](#auto-versioning) | `npm`           |
| `version`      | Manually set the current version in semver format                          |                 |
| `empty-value`  | Placeholder for any missing value in the watermark format                  | `?`             |

## Outputs

- `watermark` The produced watermark

## Syntax

The watermark format syntax comprises a single string. Any character sequence that exactly matches the keywords will be
replaced with the respective value any other character will be preserved. There are various keywords that can be
leveraged.

### GitHub

| Keyword  | Example                                    | Description                                                                                                                                                                                                                                              |
|----------|--------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `REF`    | `refs/head/main`                           | The fully-formed ref of the branch or tag that triggered the workflow run. See [`github.ref`](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/accessing-contextual-information-about-workflow-runs#github-context) |
| `BRANCH` | `main`                                     | The branch that triggered the workflow run.                                                                                                                                                                                                              |
| `TAG`    | `feat-1`                                   | The tag that triggered the workflow run.                                                                                                                                                                                                                 |
| `SHA`    | `2e6dcddeed3d110fa2f0aff8b8307c221c007932` | The hash of the commit that is being processed.                                                                                                                                                                                                          |
| `SHA8`   | `2e6dcdde`                                 | The first 8 digits of the commit hash. Imitates the style of hashes displayed on JetBrains interfaces.                                                                                                                                                   |
| `SHA7`   | `2e6dcdd`                                  | The first 7 digits of the commit hash. Imitates the style of hashes displayed on GitHub.                                                                                                                                                                 |
| `RUN`    | `17`                                       | The incremental id of the GitHub action run.                                                                                                                                                                                                             |

## Timestamp

| Keyword    | Example            |
|------------|--------------------|
| `DATE`     | `2025-01-15`       |
| `DATETIME` | `2025-01-15 17:31` |
| `YY`       | `25`               |
| `YYYY`     | `2025`             |
| `MM`       | `01`               |
| `DD`       | `15`               |
| `HH`       | `17`               |
| `mm`       | `31`               |
| `ss`       | `50`               |

## Auto Versioning

The action will automatically attempt to extract the project version from the repository. This is performed with
different strategies depending on the `auto-version` project flavour specified. Currently supported strategies are:

- `npm` where the version will be read from the `package.json` if present

Alternatively, the action can be provided a `version` as an imput parameter that will be used instead.

| Keyword   | Example   |
|-----------|-----------|
| `VERSION` | `1.5.127` |
| `MAYOR`   | `1`       |
| `MINOR`   | `5`       |
| `PATCH`   | `127`     |

[//]: # (https://github.com/jaywcjlove/github-action-read-file)