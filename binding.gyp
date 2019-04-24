{
  "targets": [
    {
      "target_name": "pointInSvgPath",
      "sources": [
        "src/main.cpp",
        "src/point-in-svg-path.cpp"
      ],
      "conditions": [
        [
          "OS=='mac'",
          {
            "xcode_settings": {
              "OTHER_CPLUSPLUSFLAGS": [
                "-std=c++14"
              ],
              "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
              "GCC_ENABLE_CPP_RTTI": "YES",
              "MACOSX_DEPLOYMENT_TARGET": "10.14"
            },
            "include_dirs": [
              "/System/Library/Frameworks/CoreFoundation.Framework/Headers",
              "/System/Library/Frameworks/CoreGraphics.Framework/Headers",
              "/System/Library/Frameworks/CoreText.Framework/Headers",
              "/System/Library/Frameworks/CoreServices.Framework/Headers",
              "<!@(node -p 'require(\"node-addon-api\").include')",
              "<(module_root_dir)/include/skia/include/core",
              "<(module_root_dir)/include/skia/include/config",
              "<(module_root_dir)/include/skia/include/utils",
            ],
            "link_settings": {
              "libraries": [
                "-framework CoreFoundation",
                "-framework CoreGraphics",
                "-framework CoreText",
                "-framework CoreServices"
              ]
            },
            "dependencies": [
              "<!(node -p 'require(\"node-addon-api\").gyp')"
            ],
            "libraries": [
              "-L<(module_root_dir)/include/skia/out/Release",
              "-lskia"
            ]
          }
        ],
        [
          "OS=='linux'",
          {
            "cflags!": [
              "-fno-exceptions",
              "-fno-rtti"
            ],
            "cflags_cc!": [
              "-fno-exceptions",
              "-fno-rtti"
            ],
            "cflags": [
              "-std=c++1y"
            ],
            "include_dirs": [
              "<!@(node -p 'require(\"node-addon-api\").include')",
              "<(module_root_dir)/include/skia/include/core",
              "<(module_root_dir)/include/skia/include/config",
              "<(module_root_dir)/include/skia/include/utils",
            ],
            "dependencies": [
              "<!(node -p 'require(\"node-addon-api\").gyp')"
            ],
            "libraries": [
              "-L<(module_root_dir)/include/skia/out/Release",
              "-lskia"
            ]
          }
        ]
      ]
    }
  ]
}

