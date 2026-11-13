# Interactive terminal

Everything operates in the current page session. Nothing is executed as JavaScript or sent to a server. Refreshing or `reset` restores the default presentation. The source is `src/components/Terminal.jsx`; React page controls live in `src/hooks/usePageControls.js`.

| Command | Effect |
| --- | --- |
| `help` | Full command guide |
| `whoami`, `ls`, `email` | Identity, available sections, email address |
| `go research` | Navigate to a section while the terminal docks on screen |
| `go projects`, `go experience`, `go contact`, `go top` | Other destinations |
| `go hermes`, `go selene`, `go terra`, `go robot` | Specific research/project destinations |
| `go steady`, `go punchd`, `go larp` | Hackathon project destinations |
| `scroll up`, `scroll down`, `scroll top`, `scroll bottom`, `scroll 300` | Move the page; numeric scroll accepts -10000…10000 pixels |
| `dock left`, `dock right` | Pin the terminal near a bottom corner |
| `home` | Return the terminal and viewport to the hero |
| `move left 80`, `move right`, `move up`, `move down` | Move terminal, default 80px; clamped on screen |
| `move 100 150` | Screen coordinates, clamped on screen |
| `size small`, `size medium`, `size large` | Resize terminal, clamped to viewport |
| `minimize` | Collapse terminal; expand with + |
| `theme light`, `theme night` | Switch page atmosphere |
| `accent lavender`, `accent mint`, `accent peach`, `accent blue` | Change hero and spotlight accent |
| `grid on`, `grid off` | Toggle background dots |
| `layout cozy`, `layout compact` | Adjust page spacing |
| `motion on`, `motion off` | Disable or enable page motion; system reduced motion takes precedence |
| `shuffle projects`, `shuffle research` | Reorder cards; preserves stable IDs and component state |
| `spotlight hermes` | Highlight and navigate to a project |
| `spotlight selene/terra/robot/steady/punchd/larp` | Other spotlight targets (use a single name) |
| `spotlight off` | Remove highlight |
| `party` | Brief decoration, disabled for system reduced motion |
| `history` | Last 50 commands |
| `clear` | Clear output |
| `reset` | Restore terminal, theme, accent, spacing, dots, motion, order, and spotlight |

Up/down arrows recall commands and preserve the draft. Tab completes nonempty input; ambiguous matches are shown. Escape dismisses suggestions and unfocuses the input. Ctrl+L clears terminal output. Backtick outside an input brings the terminal into view (except when an image dialog is open).

The title bar drags the window. The bottom corner resizes it with pointer input or arrow keys. Floating geometry is constrained on resize. All text is proportional sans-serif.

Help now opens at the beginning of its response so the navigation commands are visible. `help go` provides a separate navigation guide with individual examples.

Every command now supports `help <command>`, `<command> --help`, and `<command> help`. Navigation shortcuts also have help entries. Tab completion includes the per-command help topics. Unknown help topics return a helpful message without changing the page.
