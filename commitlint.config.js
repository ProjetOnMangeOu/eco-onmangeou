export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'docs',
                'core',
                'chore',
                'style',
                'refactor',
                'ci',
                'test',
                'perf',
                'revert',
                'comment',
            ],
        ],
    }
};
