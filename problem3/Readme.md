# List of inefficiencies and anti-patterns

- useMemo of sortedBalances variable includes prices but prices doesn't appear in useMemo function
  > If prices updates, sortedBalances will also update
- formattedBalances is unused
- rows returns a list of WalletRow components with indexes as keys. This will cause unnessary re-render as React can't keep track with the elements when the list(sortedBalances) is changed
- rows is kept as a compuational variable which means in every re render, rows will always re run
  > Move rows in useMemo or merge rows with sortedBalances
