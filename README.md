# Logger

### Requirements

1. [Yarn Package Manager](https://yarnpkg.com/)
2. [Node Version Manager](https://github.com/nvm-sh/nvm)

### Local development

1. Run `nvm use`
2. Run `make setup`
3. Run `make build`

### Tasks

This project uses a [makefile](https://www.gnu.org/software/make/manual/make.html) to run commands.

| Command     | Description                                      |
| ----------- | ------------------------------------------------ |
| setup       | Base first-time install of project locally       |
| build       | Build the project                                |
| build-patch | Build the project and increase the patch version |
| prettier    | Run [ESLint](https://eslint.org/)                |
| test        | Launches the test runner                         |
| test-build  | Check for syntax errors.                         |
| help        | Display a list of commands                       |
