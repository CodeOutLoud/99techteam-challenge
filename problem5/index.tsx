import express, { type Request, type Response } from "express";
import supabase from "./services/supabase.tsx";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = parseInt(process.env.PORT || "3000") || 3000;

app.get("/movies", async (req: Request, res: Response) => {
  const { active, year, name } = req.query;

  const connection = supabase
    .from("movies")
    .select("*")
    .order("created_at", { ascending: false });

  if (active !== undefined) {
    connection.eq("active", active === "true");
  }

  if (year !== undefined) {
    connection.eq("year", year);
  }

  if (name !== undefined) {
    connection.ilike("name", `%${name}%`);
  }

  const { data, error } = await connection;
  if (error) {
    res.status(500).send("Error fetching movies");
  } else {
    res.json(data);
  }
});

app.get("/movies/:id", async (req: Request, res: Response) => {
  const movieId = parseInt(`${req.params.id}`);
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", movieId)
    .single();

  if (error) {
    res.status(404).send("Movie not found");
  } else {
    res.json(data);
  }
});

app.post("/movies", async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, description, year, rating } = req.body;
  const { data, error } = await supabase
    .from("movies")
    .insert([{ name, description, year, rating, active: true }]);

  if (error) {
    res.status(500).send("Error adding movie");
  } else {
    res.status(201).json(data);
  }
});

app.put("/movies/:id", async (req: Request, res: Response) => {
  const movieId = parseInt(`${req.params.id}`);
  const { name, description, year, rating, active } = req.body;
  const { data, error } = await supabase
    .from("movies")
    .update({ name, description, year, rating, active })
    .eq("id", movieId);

  if (error) {
    res.status(500).send("Error updating movie");
  } else {
    res.json(data);
  }
});

app.delete("/movies/:id", async (req: Request, res: Response) => {
  const movieId = parseInt(`${req.params.id}`);
  const { data, error } = await supabase
    .from("movies")
    .delete()
    .eq("id", movieId);

  if (error) {
    res.status(500).send("Error deleting movie");
  } else {
    res.json(data);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
