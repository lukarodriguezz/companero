// utils/styles.js — helpers de estilo compartidos

export const S = {
  btn: (bg, color = '#fff') => ({
    background: bg ?? 'var(--bg3)',
    color: bg ? color : 'var(--t2)',
    border: 'none',
    borderRadius: 9,
    padding: '10px 20px',
    fontFamily: 'inherit',
    fontSize: 14,
    fontWeight: 500,
    cursor: bg ? 'pointer' : 'not-allowed',
  }),
  btnOutline: () => ({
    background: 'transparent',
    color: 'var(--t2)',
    border: '1px solid var(--b2)',
    borderRadius: 9,
    padding: '8px 14px',
    fontFamily: 'inherit',
    fontSize: 13,
    cursor: 'pointer',
  }),
  card: (extra = {}) => ({
    background: 'var(--bg2)',
    borderRadius: 12,
    padding: '12px 14px',
    marginBottom: 8,
    ...extra,
  }),
};
