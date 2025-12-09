import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
		ignores: ['.next']
	},
  nextCoreWebVitals,
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
