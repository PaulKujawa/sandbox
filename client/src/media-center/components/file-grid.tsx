import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import { GetFilesQuery } from "media-center/repositories";
import React from "react";

interface Props {}

export const FileGrid = () => {
  const { data } = useQuery(GetFilesQuery());

  return (
    <Grid container disableEqualOverflow spacing={2}>
      {data?.map((fileUrl, idx) => (
        <Grid xs={6} sm={4} md={3} lg={2} key={idx}>
          <Card>
            <CardActionArea>
              <CardMedia component="img" height="140" image={fileUrl} />
              <CardContent>
                {/* <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography> */}
                {/* <Typography variant="caption" color="text.secondary">
                  60kB
                </Typography> */}
              </CardContent>
            </CardActionArea>
            {/* <CardActions>
              <Button size="small" color="warning">
                Delete
              </Button>
            </CardActions> */}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
