# drraccoon.me

Source for my personal site: my characters, projects I've worked on, and a bit about me.
It's a [Hugo](https://gohugo.io) site hosted on GitHub Pages. Pages are just Markdown files
in `content/`, and pushing to `master` rebuilds and deploys it.

## Editing stuff

Each character and project has its own folder with an `index.md` and its images. To change
some text, edit the Markdown under the `---` block and push. Any image dropped into a folder
shows up in that page's gallery on its own.

To add something new, make a folder by hand or have Hugo generate one:

```sh
hugo new content characters/some-character/index.md
hugo new content projects/some-project/index.md
```

New projects start out as `draft: true`, so delete that line when it's ready to go live.

## Front matter cheat sheet

The `---` block at the top of each file controls a few things:

| Key | Used on | Does |
| --- | --- | --- |
| `title` | everything | Page title and nav label |
| `subtitle` | sections, About | Line under the title, also shown on the home page cards |
| `menu_icon` | top-level pages | Font Awesome icon in the nav, like `fa-solid fa-paw` |
| `weight` | everything | Sort order, lower comes first |
| `draft: true` | everything | Hides the page |
| `species`, `pronouns` | characters | Tags on the character page |
| `tagline` | characters, projects | One-liner on cards and the page header |
| `status` | projects | `active`, `wip`, or `archived` |
| `category` | projects | Comma-separated, drives the filter buttons |
| `tech` | projects | Comma-separated tech tags |
| `repo_url`, `demo_url` | projects | Repository / Live Demo buttons |
| `date` | projects | Optional, used by the "Project Date" sort |
| `media_order` | characters, projects | Comma-separated file names to order the gallery (first one is the thumbnail) |
| `socials` | home | Social links (`label`, `url`, `icon`) |
| `featured_project` | home | Project to show off on the home page, like `/projects/polo-godot` |

Image captions:

```yaml
resources:
  - src: 'mocha5.png'
    params:
      caption: 'Art by someone'
```

GitHub-style callouts work too:

```markdown
> [!NOTE]
> Something worth knowing.
```

Site title, description, colors, and the header tagline live in `hugo.toml`.

## Running it locally

Needs Hugo extended (`winget install Hugo.Hugo.Extended`). Then run `hugo server` and open
http://localhost:1313. Add `-D` to see drafts.

## Hosting

GitHub Pages is set to deploy from GitHub Actions (see `.github/workflows/hugo.yaml`), and
`static/CNAME` points it at drraccoon.me.