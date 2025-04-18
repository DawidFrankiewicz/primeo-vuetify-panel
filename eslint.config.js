import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

// export { default } from 'eslint-config-vuetify/index.ts.mjs'
export default [
    { ignores: ['dist', 'docs'] },
    { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {
        files: ['**/*.vue'],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
    },
    {
        rules: {
            'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            'space-before-function-paren': 'off',
            'keyword-spacing': 'off',
            'comma-dangle': ['error', 'always-multiline'],
            'no-unused-vars': 'off',
            'vue/multi-word-component-names': 'off',
            'vue/no-deprecated-slot-attribute': 'off',
            'vue/max-attributes-per-line': 'off',
            'vue/html-self-closing': 'off',
            'vue/custom-event-name-casing': [
                'error',
                'camelCase',
                {
                    // Ignore camelCase words with ':' separators
                    ignores: ['/^[a-z]+(?:[A-Z][a-z]*)*(?::[a-z]+(?:[A-Z][a-z]*)*)*$/'],
                },
            ],
            'vue/prop-name-casing': ['error', 'camelCase'],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    args: 'after-used',
                    ignoreRestSiblings: false,
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_',
                },
            ],
            'func-call-spacing': 'off',
            'vue/no-v-html': 'off',
            'no-undef': 'off',
            'vue/no-unused-properties': [
                'error',
                {
                    groups: ['props'],
                    deepData: false,
                    ignorePublicMembers: false,
                    unreferencedOptions: [],
                },
            ],
        },
    },
]
