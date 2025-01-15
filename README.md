# Watermark GitHub Action

This action provide seamless generation of watermarking variables for GitHub CI/CD pipelines.

## Syntax

| Keyword    | Example                                    | Description |
|------------|--------------------------------------------|-------------|
| `REF`      | `refs/head/main`                           |             |
| `BRANCH`   | `main`                                     |             |
| `TAG`      | `feat-1`                                   |             |
| `SHA7`     | `2e6dcdd`                                  |             |
| `SHA8`     | `2e6dcdde`                                 |             |
| `SHA`      | `2e6dcddeed3d110fa2f0aff8b8307c221c007932` |             |
| `RUN`      | `17`                                       |             |
| `VERSION`  | `1.5.127`                                  |             |
| `MAYOR`    | `1`                                        |             |
| `MINOR`    | `5`                                        |             |
| `PATCH`    | `127`                                      |             |
| `DATE`     | `2025-01-15`                               |             |
| `DATETIME` | `2025-01-15 17:31`                         |             |
| `YY`       | `25`                                       |             |
| `YYYY`     | `2025`                                     |             |
| `MM`       | `01`                                       |             |
| `DD`       | `15`                                       |             |
| `HH`       | `17`                                       |             |
| `mm`       | `31`                                       |             |
| `ss`       | `50`                                       |             |

## Dev

- Write docs
- Structure inspired from [here](https://github.com/jaywcjlove/github-action-read-file)
