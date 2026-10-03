### Dane testowe i przypadki dla Fake Letters

#### ✅ Przypadki poprawne (powinny przejść bez ostrzeżeń)

| # | Tekst | Dlaczego OK |
|---|-------|-------------|
| 1 | `apple.com` | Czyste ASCII |
| 2 | `Hello World 123!` | Zwykłe litery, cyfry, znaki |
| 3 | `zażółć gęślą jaźń` | Polskie znaki (Latin Extended) |
| 4 | `Ärzte für Übersee` | Niemieckie umlauty (Latin-1 Supplement) |
| 5 | `café résumé naïve` | Francuskie akcenty |
| 6 | `España señor niño` | Hiszpańskie ñ |
| 7 | `100€ + 50£ = $$$` | Symbole walut i ASCII |
| 8 | `user@example.com` | Zwykły email |
| 9 | `https://www.google.com/search?q=test` | Normalny URL |
| 10 | `Příliš žluťoučký kůň` | Czeskie znaki |

#### ❌ Przypadki z homoglifami (powinny wykryć podejrzane znaki)

| # | Tekst | Co jest fałszywe |
|---|-------|------------------|
| 1 | `аpple.com` | Cyrylickie `а` (U+0430) na pozycji 1 |
| 2 | `gооgle.com` | Dwa cyrylickie `о` (U+043E) na pozycjach 2 i 3 |
| 3 | `рaypal.com` | Cyrylickie `р` (U+0440) na pozycji 1 |
| 4 | `miсrosoft.com` | Cyrylickie `с` (U+0441) na pozycji 3 |
| 5 | `faсebook.com` | Cyrylickie `с` (U+0441) na pozycji 3 |
| 6 | `Αpple` | Greckie `Α` (U+0391) zamiast łacińskiego `A` |
| 7 | `Ρaypal` | Greckie `Ρ` (U+03A1) zamiast łacińskiego `P` |
| 8 | `рkоbр.pl` | 3 podejrzane: cyrylickie `р`, `о`, `р` |
| 9 | `ΗΕLLO` | Greckie `Η` (eta) i `Ε` (epsilon) — 2 znaki |
| 10 | `ехаmple.com` | Cyrylickie `е`, `х`, `а` — 3 znaki |

#### ❌ Przypadki z look-alike'ami

| # | Tekst | Co jest podejrzane |
|---|-------|-------------------|
| 1 | `αpple` | Greckie α (alfa, U+03B1) — podobne do `a` |
| 2 | `κing` | Greckie κ (kappa, U+03BA) — podobne do `k` |
| 3 | `τest` | Greckie τ (tau, U+03C4) — podobne do `t` |
| 4 | `вank` | Cyrylickie в (ve, U+0432) — podobne do `b` |

#### ❌ Przypadki z Fullwidth Latin

| # | Tekst | Co jest podejrzane |
|---|-------|-------------------|
| 1 | `ａｐｐｌｅ` | Fullwidth wersje a, p, p, l, e — 5 znaków |
| 2 | `Ｇｏｏｇｌｅ` | Fullwidth — 6 znaków |

#### ❌ Przypadki z nieznanymi/egzotycznymi alfabetami (fallback detection)

| # | Tekst | Co jest podejrzane |
|---|-------|-------------------|
| 1 | `appleمcom` | Arabska litera م (U+0645) |
| 2 | `googleאcom` | Hebrajska litera א (U+05D0) |
| 3 | `test你好` | Chińskie znaki CJK |
| 4 | `helloこんにちは` | Japońska hiragana |
| 5 | `สวัสดี hello` | Tajskie znaki |

#### 🔀 Przypadki mieszane (kilka typów naraz)

| # | Tekst | Opis |
|---|-------|------|
| 1 | `аррlе.com` | Cyrylickie `а`, `р`, `р`, `е` — 4 znaki, tylko `l` jest łacińskie! |
| 2 | `Gооglе іs grеаt` | Mix cyrylickich `о`, `о`, `е`, `і`, `е`, `а` — 6 znaków |
| 3 | `Τhе Ρrісе` | Mix greckiego `Τ`, cyrylickich `е`, greckiego `Ρ`, cyrylickich `і`, `с`, `е` |

#### ⚠️ Edge cases

| # | Tekst | Oczekiwanie |
|---|-------|-------------|
| 1 | *(pusty)* | Komunikat "Please enter text to check" |
| 2 | `   ` | Same spacje — komunikat o pustym polu |
| 3 | `a` | 1 znak, OK |
| 4 | Tekst 1000 znaków | Limit — powinien zaakceptować |
| 5 | `123456789` | Same cyfry — OK |
| 6 | `...---!!!` | Same znaki specjalne — OK |

#### 📋 Gotowe do wklejenia (copy-paste)

Oto teksty z ukrytymi homoglifami gotowe do wklejenia w aplikację:

```
аpple.com
gооgle.com
рaypal.com
miсrosoft.com
рkоbр.pl
ΗΕLLO WΟRLD
ａｐｐｌｅ
αpple κing τest
```

Każdy z tych tekstów wygląda normalnie, ale zawiera podejrzane znaki z innych alfabetów! 🕵️