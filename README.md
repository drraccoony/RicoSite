# DrRaccoon.me

My personal site, built with [Hugo](https://gohugo.io) and published to GitHub Pages.
Every page is a Markdown file in [`content/`](content/). Push to `master` and the
[workflow](.github/workflows/hugo.yaml) rebuilds and deploys the site automatically.

## Where things live

```
content/
├── _index.md                  Home page: intro text, social links, featured project
├── avatar.png                 Home page avatar (first image in content/)
├── about/index.md             About page
├── characters/
│   ├── _index.md              Characters landing page
│   └── rico/                  One folder per character
│       ├── index.md           Bio + details
│       └── *.png / *.jpg      Gallery images (drop them in, they show up automatically)
├── projects/
│   ├── _index.md              Projects landing page
│   └── polo-godot/            One folder per project (same idea as characters)
└── professional/_index.md     Uses the same layout as projects; add project folders here too
```

The folder name becomes the URL, e.g. `content/projects/polo-godot/` → `/projects/polo-godot/`.

## Common edits

**Edit text:** open the page's `index.md` (or `_index.md`), edit the Markdown below the `---` block, and commit.

**Add a character or project:** make a new folder with an `index.md` and some images, or let Hugo
create one from a template:

```sh
hugo new content characters/new-character/index.md
hugo new content projects/new-project/index.md
```

New projects start with `draft: true`. Remove that line (or set it to `false`) to publish.

**Front matter options** (the `---` block at the top of each file):

| Key | Where | What it does |
| --- | --- | --- |
| `title` | everywhere | Page title / nav label |
| `subtitle` | sections, About | Shown under the title and on the home page cards |
| `menu_icon` | top-level pages | Font Awesome classes for the nav icon, e.g. `fa-solid fa-paw` |
| `weight` | everywhere | Sort order: lower numbers come first (nav, cards, lists) |
| `draft: true` | everywhere | Hide the page from the published site |
| `species`, `pronouns` | characters | Tags on the character page |
| `tagline` | characters, projects | One-liner on cards and page header |
| `status` | projects | `active`, `wip`, or `archived` |
| `category` | projects | Comma-separated; drives the filter buttons |
| `tech` | projects | Comma-separated tech-stack tags |
| `repo_url`, `demo_url` | projects | "Repository" / "Live Demo" buttons |
| `date` | projects | Optional; used by the "Project Date" sort |
| `media_order` | characters, projects | Comma-separated image file names to set the gallery order. The first image is also the card thumbnail |
| `socials` | home | List of `label` / `url` / `icon` social links |
| `featured_project` | home | Path of a project to spotlight, e.g. `/projects/polo-godot` |

Image captions can be added with Hugo's `resources` front matter:

```yaml
resources:
  - src: 'mocha5.png'
    params:
      caption: 'Art by someone'
```

GitHub-style alerts work in any page:

```markdown
> [!NOTE]
> Something worth knowing.
```

Site-wide settings (site title, description, theme colors, header tagline) are in [`hugo.toml`](hugo.toml).

## Preview locally (optional)

Install Hugo **extended** (`winget install Hugo.Hugo.Extended`), then:

```sh
hugo server
```

Open http://localhost:1313. Drafts are hidden; use `hugo server -D` to preview them.

## One-time GitHub setup

1. Create a repository and push this folder to its `master` branch.
2. In the repository, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. For the custom domain, `static/CNAME` already contains `drraccoon.me`. Under **Settings → Pages → Custom domain**,
   enter `drraccoon.me`, then point DNS at GitHub Pages
   ([instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)).
   Enable **Enforce HTTPS** once the certificate is issued.
