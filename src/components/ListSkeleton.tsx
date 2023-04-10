import { Box, Chip, Divider, Skeleton, Stack } from "@mui/material";

const skeletons = [0, 1, 2, 3, 4, 5, 6];

type ListSkeletonProps = {
  hideDivider?: boolean;
};

export const ListSkeleton = ({ hideDivider }: ListSkeletonProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          position: "sticky",
          top: "125px",
          paddingBlock: 2,
          zIndex: 888,
          backgroundColor: "background.default",
          width: "100%",
        }}
      >
        {!hideDivider && (
          <Divider variant="middle">
            <Chip label={"Loading"} />
          </Divider>
        )}

        {skeletons.map((x) => (
          <Box key={x} sx={{ padding: 1, marginTop: 2, marginInline: 3 }}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Skeleton variant="circular" height={40} width={40} />
              <Stack sx={{ width: "100%" }}>
                <Skeleton />
                <Skeleton />
              </Stack>
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
