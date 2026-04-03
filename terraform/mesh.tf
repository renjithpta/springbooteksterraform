resource "aws_appmesh_mesh" "simple" {
  name = "eks-mesh"
}

resource "aws_appmesh_virtual_node" "user_service" {
  name      = "user-service"
  mesh_name = aws_appmesh_mesh.simple.name

  spec {
    listener {
      port_mapping {
        port     = 8080
        protocol = "http"
      }
    }

    service_discovery {
      dns {
        hostname = "user-service.default.svc.cluster.local"
      }
    }
  }
}

resource "aws_appmesh_virtual_node" "weather_service" {
  name      = "weather-service"
  mesh_name = aws_appmesh_mesh.simple.name

  spec {
    listener {
      port_mapping {
        port     = 8081
        protocol = "http"
      }
    }

    service_discovery {
      dns {
        hostname = "weather-service.default.svc.cluster.local"
      }
    }
  }
}
