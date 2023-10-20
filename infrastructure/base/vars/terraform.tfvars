aws_region         = "eu-west-3"
allowed_account_id = "375236790310"
project_name       = "tnc-hrt"
repo_name          = "tnc-human-rights-tool"

staging_domain            = "staging.tnc-hrt.dev-vizzuality.com"
staging_ec2_instance_type = "t3a.small"

production_domain            = "humanrights.naturebase.org"
production_ec2_instance_type = "t3a.small"

beanstalk_platform = "64bit Amazon Linux 2023 v4.0.1 running Docker"
beanstalk_tier     = "WebServer"
rds_engine_version = "15.4"
rds_instance_class = "db.t3.micro"
cms_url            = "https://naturebase.directus.app"
