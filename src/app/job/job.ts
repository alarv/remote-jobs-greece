export interface Job {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    company_name: string;
    job_type: string[];
  };
}
 