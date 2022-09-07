import {
  ActionIcon,
  Badge,
  Button,
  Card,
  createStyles,
  Group,
  Image,
  Text,
} from '@mantine/core'
import { NextLink } from '@mantine/next'
import { IconStar, IconTag } from '@tabler/icons'
import useIsDark from '../hooks/useIsDark'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: useIsDark() ? theme.colors.dark[7] : theme.white,
  },
  section: {
    borderBottom: `1px solid ${
      useIsDark() ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  star: {
    color: theme.colors.yellow[6],
  },
  label: {
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}))

interface ProjectProps {
  id: number
  image: string
  title: string
  description: string
  tags: string[]
}

export default function Project({
  id,
  image,
  title,
  description,
  tags,
}: ProjectProps) {
  const { classes } = useStyles()
  const isDark = useIsDark()
  const tagList = tags.map((tag, i) => (
    <Badge
      key={i}
      color={isDark ? 'dark' : 'gray'}
      leftSection={<IconTag size={10} />}
    >
      {tag}
    </Badge>
  ))
  return (
    <Card withBorder radius='md' p='md' className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>
      <Card.Section className={classes.section} mt='md'>
        <Group>
          <Text size='lg' weight={500}>
            {title}
          </Text>
          <Badge size='sm'>Signage</Badge>
        </Group>
        <Text size='sm' my='xs'>
          {description}
        </Text>
        <Group spacing={7}>{tagList}</Group>
      </Card.Section>
      <Group mt='xs'>
        <Button
          radius='md'
          style={{ flex: 1 }}
          component={NextLink}
          href={`/projects/${id}`}
        >
          자세히 보기
        </Button>
        <ActionIcon variant='default' radius='md' size={36}>
          <IconStar size={18} className={classes.star} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  )
}
