import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
		ignores: ['.next']
	},
  ...compat.extends("next/core-web-vitals"),
  {
    files: ['**/*.ts', '**/*.tsx'],
		
      
  },
  {
		linterOptions: {
			reportUnusedDisableDirectives: true
		},
		languageOptions: {
			parserOptions: {
				projectService: true
			}
		}
	}
)
