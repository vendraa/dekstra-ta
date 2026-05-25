interface InitialAvatarProps {
  name: string;
  size?: number;
}

export default function InitialAvatar({ name, size = 32 }: InitialAvatarProps) {
  const initials = name
    .split(' ')
    .map(word => word[0].toUpperCase())
    .slice(0, 2)
    .join('');

  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 70%, 50%)`;
  };

  const bgColor = stringToColor(name);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 600,
        fontSize: size / 2,
        userSelect: 'none',
      }}
    >
      {initials}
    </div>
  );
}
