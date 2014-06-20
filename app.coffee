# Files in this list will not be compiled - minimatch supported
ignore_files: ['_*', 'readme*', '.gitignore', '.DS_Store']
ignore_folders: ['.git', 'node_modules']

watcher_ignore_folders: ['components', 'node_modules']

# Layout file config
# `default` applies to all views. Override for specific
# views as seen below.
layouts:
  default: 'layout.jade'
  # 'special_view.jade': 'special_layout.jade'

# Precompiled template path, see http://roots.cx/docs/#precompile
# templates: 'views/templates'
