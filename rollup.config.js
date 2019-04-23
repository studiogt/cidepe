import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import VuePlugin from "rollup-plugin-vue";
import replace from "rollup-plugin-replace";
import babel from "rollup-plugin-babel";
import minify from 'rollup-plugin-babel-minify';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

module.exports = {
    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify("production"),
            "process.env.VUE_ENV": JSON.stringify("browser")
        }),
        
        json(),
        resolve({
            customResolveOptions: {
                moduleDirectory: process.env['NODE_PATH']
            }
        }),
        commonjs(),
        VuePlugin(/* VuePluginOptions */),
        
        babel({
            minified: true,
            comments: false,
            runtimeHelpers: true,
            exclude: ['node_modules/**', '**/node_modules/**', process.env['NODE_PATH'], process.env['NODE_PATH']+'/**'],
            presets: [
                [
                    "env",
                    {
                        modules: false,
                        useBuiltIns: true,
                        minified: true,
                        targets: {
                            browsers: [
                                "since 2015",
                                "last 8 versions",
                                "not dead",
                                "> 0.5%"
                            ]
                        }
                    }
                ],
                "stage-3",
                "es2015-rollup",
                "minify"
            ],
            plugins: [
                ['transform-runtime',{
                    "helpers": false,
                    "polyfill": false,
                    "regenerator": true,
                    "moduleName": "babel-runtime"
                }]
            ]
        }),
        minify({
            comments: false
        })
    ]
};
